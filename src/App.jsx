import React, { useEffect, useMemo, useState } from 'react';
import useInput from './hooks/useInput';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import Navigation from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [searchKeyword, onSearchKeywordHandler] = useInput('');
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState('');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  useEffect(() => {
    async function firstMount() {
      const { data } = await getUserLogged();
      setAuthedUser(data);

      const theme = localStorage.getItem('theme') || 'dark';
      setTheme(theme);
      localStorage.setItem('theme', theme);

      setInitializing(false);
    }

    firstMount();

    return () => {
      setInitializing(true);
      setAuthedUser(null);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken();
  };

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  if (initializing)
    return (
      <>
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      </>
    );

  if (authedUser === null) {
    return (
      <>
        <ThemeProvider value={themeContextValue}>
          <header className="note-app__header">
            <Link to="/">
              <h1>Notes</h1>
            </Link>
            <Navigation />
          </header>
          <main className="note-app__body">
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              ></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
            </Routes>
          </main>
        </ThemeProvider>
      </>
    );
  }

  return (
    <>
      <ThemeProvider value={themeContextValue}>
        <header className="note-app__header">
          <Link to="/">
            <h1>Notes</h1>
          </Link>
          <input
            type="text"
            placeholder="cari catatan..."
            value={searchKeyword}
            onChange={onSearchKeywordHandler}
          />
          <Navigation logout={onLogout} name={authedUser.name} />
        </header>
        <main className="note-app__body">
          <Routes>
            <Route
              path="/"
              element={<HomePage searchKeyword={searchKeyword} />}
            />
            <Route path="/notes/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </ThemeProvider>
    </>
  );
}

App.propTypes = {};

export default App;
