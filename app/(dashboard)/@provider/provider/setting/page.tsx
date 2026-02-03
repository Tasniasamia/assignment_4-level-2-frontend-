import SettingTab from '@/components/modules/dashboard/provider/setting/settingTab';

const page = () => {
    return (
        <main className="min-h-screen bg-background">
   
          <h1 className="mb-8 text-4xl font-bold">Profile Management</h1>
          <SettingTab/>

        </main>
    );
};

export default page;