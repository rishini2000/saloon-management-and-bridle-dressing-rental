import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  route("/appointment-manager", "routes/appointment-manager.tsx"),
  route("/crm", "routes/crm.tsx"),
  route("/employee-manager", "routes/employee-manager.tsx"),
  route("/inventory", "routes/inventory.tsx"),
  route("/reports", "routes/reports.tsx"),
  route("/settings", "routes/settings.tsx"),
] satisfies RouteConfig;
