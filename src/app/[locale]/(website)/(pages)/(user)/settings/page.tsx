"use client";

import Container from "@/components/ui/container";
import { Card } from "antd";
import ChangePasswordForm from "./_comps/changePasswordForm";

const SettingsPage = () => {
  return (
    <Container>
      <div className="my-6">
        <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-500">
          Manage your account settings and security
        </p>
      </div>

      <div className="grid gap-6">
        <Card title="Security" className="shadow-sm w-full sm:w-2/3">
          <ChangePasswordForm />
        </Card>
      </div>
    </Container>
  );
};

export default SettingsPage;
