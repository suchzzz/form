import SideBar from '../src/components/SideBar'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Tbd from '../src/components/Tbd';
import Navbar from '../src/components/Navbar';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { getTheme, initializeIcons } from '@fluentui/react';
// import { mergeStyles, DefaultPalette } from '@fluentui/react/lib/Styling'; 
import { IStyle, mergeStyleSets } from '@fluentui/merge-styles';
import { useAuth } from './context/AuthContext';
import Auth from '../src/pages/Auth';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@fluentui/react';
import Dashboard from './pages/Dashboard';
import EmpAdd from '../src/components/EmpAdd';
import { useEffect } from 'react';
const theme = getTheme();

// const styles = {
//   root: [
//     {
//       background: theme.palette.themePrimary,
//       display: 'none',
//       selectors: {
//         ':hover': {
//           background: theme.palette.themeSecondary,
//         },
//         '&.isExpanded': {
//             display: 'block'
//         },
//         '&:hover .childElement': {
//             color: 'white'
//         }
//       }
//     }
//   ]
// };
const App = () => {
  const navigate = useNavigate();
  const { isAuthnticated, role, loading } = useAuth();
  initializeIcons();
  let { root, right, content } = getClassNames();


  if (loading) {
    return <Stack style={{ marginTop:"50vh",}}><Spinner label="Loading" /></Stack>;
  }
  if (!isAuthnticated) {
    return <Auth />
  }
  return (
    <Stack className={root}>

      <Stack >
        <SideBar />
      </Stack>
      <Stack className={right}>
        <Navbar />
        <Stack className={content}>
          <Routes >
            <Route path='/' element={<Dashboard />} />
            {role == "admin" && <Route path="/emp" element={<HomePage />} />}
            <Route path="/leaves" element={<Tbd text="leaves" />} />
            <Route path="/attendance" element={<Tbd text="attendance" />} />
            <Route path="/report" element={<Tbd text="report" />} />
            <Route path="/event" element={<Tbd text="event" />} />
            <Route path="/cp" element={<EmpAdd />} />
            <Route path="/policy" element={<Tbd text="policy" />} />

          </Routes>
        </Stack>
      </Stack>

    </Stack>
  )
}

export const getClassNames = () => {
  return mergeStyleSets({
    root: {
      flexDirection: 'row',
      width: "100%",
    },
    home: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    right: {
      width: "100%",
      // padding: "5px ",
      marginLeft: "18%"
    },
    content: {
      // padding: "10px",
    }
  });
};

export default App
