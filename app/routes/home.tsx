import type { Route } from "./+types/home";
import { Welcome } from "../views/welcome/welcome";
import { DatePicker } from 'antd';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <Welcome />
      <DatePicker />
    </>
  );
}
