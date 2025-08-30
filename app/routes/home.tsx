import type { Route } from "./+types/home";
import { Result } from 'antd';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saloon System Dashboard" },
    { name: "description", content: "Welcome to Saloon Management System!" },
  ];
}

export default function Home() {
  return (
    <Result
      title="Dashboard"
      subTitle="Welcome to the Saloon Management System"
    />
  );
}
