import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import HomePage from './pages/home/HomePage';
import About from './pages/home/container/About';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProjectPage from './pages/project/ProjectPage';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import Comments from './pages/admin/screens/comments/Comments';
import ManagePosts from './pages/admin/screens/posts/ManagePosts';
import EditPost from './pages/admin/screens/posts/EditPost';
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import { BubbleChat } from 'flowise-embed-react';

function App() {
  return (
    <div className='App font-opensans'>
      {/* Chatbot Flowise */}
      <BubbleChat
        chatflowid="8fcd4b23-f525-44af-9ddb-fbd5e4dbfa60"
        apiHost="https://flowiseportofolio.zeabur.app"
        theme={{
          button: {
            backgroundColor: '#6414fc',
            right: 20,
            bottom: 20,
            size: 48, // small | medium | large | number
            dragAndDrop: true,
            iconColor: 'white',
            autoWindowOpen: {
              autoOpen: true, //parameter to control automatic window opening
              openDelay: 2, // Optional parameter for delay time in seconds
              autoOpenOnMobile: false, //parameter to control automatic window opening in mobile
            },
          },
          tooltip: {
            showTooltip: true,
            tooltipMessage: "Hi There I'm Tio👋!",
            tooltipBackgroundColor: '#24242c',
            tooltipTextColor: 'white',
            tooltipFontSize: 16,
          },
          customCSS: ``, // Add custom CSS styles. Use !important to override default styles
          chatWindow: {
            showTitle: true,
            showAgentMessages: true,
            title: 'TIOPS BOT',
            welcomeMessage: 'Hello! This is My Portofolio BOT',
            errorMessage: 'This is a custom error message',
            backgroundColor: 'white',
            backgroundImage: 'enter image path or link', // If set, this will overlap the background color of the chat window.
          
            fontSize: 16,
            starterPrompts: ['Who is Tio Fulalo Simatupang?', 'What projects have been carried out?'], // It overrides the starter prompts set by the chat flow passed
            starterPromptFontSize: 15,
            clearChatOnReload: false, // If set to true, the chat will be cleared when the page reloads
            sourceDocsTitle: 'Sources:',
            renderHTML: true,
            botMessage: {
              textColor: 'black',
              showAvatar: true,
              avatarSrc: 'https://res.cloudinary.com/dci5b8svu/image/upload/v1739900957/Frame_4_2_kpppsn.png',
            },
            userMessage: {
              backgroundColor: '#6414fc',
              textColor: '#ffffff',
              showAvatar: true,
              avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
            },
            textInput: {
              placeholder: 'Type your question',
              backgroundColor: '#ffffff',
              textColor: '#303235',
              sendButtonColor: '#6414fc',
              maxChars: 50,
              maxCharsWarningMessage: 'You exceeded the characters limit. Please input less than 50 characters.',
              autoFocus: true, // If not used, autofocus is disabled on mobile and enabled on desktop. true enables it on both, false disables it on both.
              sendMessageSound: true,
              // sendSoundLocation: "send_message.mp3", // If this is not used, the default sound effect will be played if sendSoundMessage is true.
              receiveMessageSound: true,
              // receiveSoundLocation: "receive_message.mp3", // If this is not used, the default sound effect will be played if receiveSoundMessage is true.
            },
            feedback: {
              color: '#303235',
            },
            dateTimeToggle: {
              date: true,
              time: true,
            },
            footer: {
              textColor: '#303235',
              text: '',
              company: '',
              companyLink: '',
            },
          }
        }}
      />
      
      {/* Routing Halaman */}
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/project' element={<ProjectPage />} />
        <Route path='/project/:slug' element={<ArticleDetailPage />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path='comments' element={<Comments />} />
          <Route path='posts/manage' element={<ManagePosts />} />
          <Route path='posts/manage/edit/:slug' element={<EditPost />} />
          <Route path='categories/manage' element={<Categories />} />
          <Route path='categories/manage/edit/:slug' element={<EditCategories />} />
          <Route path='users/manage' element={<Users />} />
        </Route>
      </Routes>
      
      {/* Notifikasi */}
      <Toaster />
    </div>
  );
}

export default App;
