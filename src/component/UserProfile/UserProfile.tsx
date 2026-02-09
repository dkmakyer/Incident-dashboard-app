import { User, ChevronDown } from 'lucide-react';
import './UserProfile.css';

const UserProfile = () => {
    return (
        <div className="user-profile">
            <div className="user-avatar">
                <User size={20} />
            </div>
            <div className="user-info">
                <span className="user-name">David Akyer</span>
                <span className="user-role">Administrator</span>
            </div>
            <ChevronDown size={16} className="user-dropdown-icon" />
        </div>
    );
};

export default UserProfile;
