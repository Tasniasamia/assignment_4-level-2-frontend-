import { getUser } from '@/actions/user.action';
import SettingTab from '@/components/modules/dashboard/provider/setting/settingTab';

const page = async() => {
  const {data,error}=await getUser();
    return (
        <main className="min-h-screen bg-background">
   
          <h1 className="mb-8 text-4xl font-bold">Profile Management</h1>
          <SettingTab user={data?.data}/>

        </main>
    );
};

export default page;