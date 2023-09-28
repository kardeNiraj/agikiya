import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/authContext.jsx';
import LoginPage from './views/LoginPage.jsx';
import SignupPage from './views/SignupPage.jsx';
import PlanPage from './views/PlanPage.jsx';
import SuccessPage from './views/SuccessPage.jsx';
import CancelPage from './views/CancelPage.jsx';
import SubscriptionsPage from './views/SubscriptionsPage.jsx';
import CreatePlan from './views/CreatePlan.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/plan/:id" element={<PlanPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/create-plan" element={<CreatePlan />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </>
);
