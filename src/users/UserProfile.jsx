import { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome, {user.name}!</h1>
                    <img src={user.imageUrl} alt="Profile" />
                    <p>Email: {user.email}</p>
                    <button onClick={() => {
                        localStorage.removeItem("user");
                        window.location.reload();
                    }}>Logout</button>
                </>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
};

export default Profile;
