import React, { useState } from 'react';
import UserInfo from '../UserInfo/UserInfo';

export default function Input() {
    const [username, setUsername] = useState<string>('');
    const handleSubmit = (e: any) => {
        return
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
