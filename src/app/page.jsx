import { redirect } from "next/navigation";

const LandingPage = () => {
    redirect('/login');
    return <div>در حال انتقال...</div>;
};

export default LandingPage;