import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Heart, MessageSquare, MapPin, LogOut } from 'lucide-react';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user, profile, signOut } = useSupabaseAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!user || !profile || profile.role !== 'client') {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Client Dashboard</h1>
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
                <Search className="h-5 w-5" />
                Recent Searches
              </CardTitle>
              <CardDescription>
                Your latest property searches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Saved searches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorites
              </CardTitle>
              <CardDescription>
                Properties you've liked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Saved properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages
              </CardTitle>
              <CardDescription>
                Communications with brokers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-sm text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Find Your Perfect Property</CardTitle>
              <CardDescription>
                Start your property search or connect with brokers
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Search className="h-6 w-6 mb-2" />
                Search Properties
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <MapPin className="h-6 w-6 mb-2" />
                Find Brokers
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Heart className="h-6 w-6 mb-2" />
                View Favorites
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <MessageSquare className="h-6 w-6 mb-2" />
                Messages
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}