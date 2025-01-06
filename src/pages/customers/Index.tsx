import { DashboardLayout } from "@/components/DashboardLayout";

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground mt-2">
          Manage your customer relationships
        </p>
      </div>
    </DashboardLayout>
  );
}