import Navbar from "~/components/Navbar";

export const meta = () => ([
    { title: 'Resumind | Profile'},
    { name: 'description', content: 'Your profile'}
])

const Profile = () => {
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default Profile;