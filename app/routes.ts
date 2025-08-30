import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/appointments", "routes/appointment-manager.tsx"),
  route("/invoicing", "routes/invoicing.tsx"),
  route("/crm", "routes/crm.tsx"),
  route("/employees", "routes/employee-manager.tsx"),
  route("/services", "routes/services-manager.tsx"),
] satisfies RouteConfig;
