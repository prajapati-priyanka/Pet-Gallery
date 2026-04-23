import { ThemeProvider } from 'styled-components';
import './App.css'
import { theme } from './theme/theme';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery';
import AboutMe from './pages/AboutMe';
import PetDetails from './pages/PetDetails';
import { SelectionProvider } from './context/SelectionProvider';


function App() {  

  return (
  <SelectionProvider>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
     <Navbar />
     <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path="/pets/:id" element={<PetDetails />} />
      <Route path='/about_me' element={<AboutMe />} />
     </Routes>
    </ThemeProvider>
    </BrowserRouter>
    </SelectionProvider>
  
  

  
  )
}

export default App
