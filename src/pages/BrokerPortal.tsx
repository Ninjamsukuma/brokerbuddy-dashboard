import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, TrendingUp, Settings, LogOut } from 'lucide-react';

export default function BrokerPortal() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useSupabaseAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!user || !profile || profile.role !== 'broker') {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Broker Portal</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {profile.full_name}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                My Properties
              </CardTitle>
              <CardDescription>
                Manage your property listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Clients
              </CardTitle>
              <CardDescription>
                View and manage your clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Active clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance
              </CardTitle>
              <CardDescription>
                Track your success metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0%</div>
              <p className="text-sm text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and tools for brokers
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Building2 className="h-6 w-6 mb-2" />
                Add Property
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Manage Clients
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Settings className="h-6 w-6 mb-2" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}