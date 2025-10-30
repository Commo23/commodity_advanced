import React, { useEffect, useState } from "react";
import {
  BarChart3,
  DollarSign,
  Globe,
  Home,
  Settings,
  TrendingUp,
  FileText,
  Shield,
  AlertTriangle,
  Target,
  Users,
  Briefcase,
  Activity,
  Calculator,
  Zap,
  Database
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompanySettings, getCompanyNameSync, companySettingsEmitter } from "@/hooks/useCompanySettings";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { SyncIndicator } from "./SyncIndicator";
import "@/styles/sidebar-zoom.css";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    description: "Global overview and key metrics"
  },
  {
    title: "Commodity Market",
    url: "/commodity-market",
    icon: Globe,
    description: "Real-time commodity market data and prices"
  },
  {
    title: "Commodity Exposures",
    url: "/exposures",
    icon: DollarSign,
    description: "Manage commodity exposures and positions",
    badge: "Active"
  },
  {
    title: "Hedging Instruments",
    url: "/hedging",
    icon: Shield,
    description: "Forwards, options, swaps management"
  },
  {
    title: "Strategy Builder",
    url: "/strategy-builder",
    icon: Target,
    description: "Build and test hedging strategies"
  },
  {
    title: "Pricers",
    url: "/pricers",
    icon: Calculator,
    description: "Advanced pricing for options, swaps and forwards"
  },
  {
    title: "Regression Analysis",
    url: "/regression-analysis",
    icon: TrendingUp,
    description: "Advanced regression analysis and data visualization"
  },
  {
    title: "Risk Analysis",
    url: "/risk-analysis",
    icon: BarChart3,
    description: "Scenario analysis and stress testing"
  },
  {
    title: "Position Monitor",
    url: "/positions",
    icon: Activity,
    description: "Real-time position monitoring"
  }
];

const reportingItems = [
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    description: "Generate custom reports"
  }
];

const managementItems = [
  {
    title: "User Management",
    url: "/users",
    icon: Users,
    description: "Roles and permissions"
  },
  {
    title: "Database Sync",
    url: "/database-sync",
    icon: Database,
    description: "Synchronize with Supabase"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "System configuration"
  }
];

export function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { getCompanyNameParts, isLoaded, getCompanyLogo } = useCompanySettings();
  const logo = getCompanyLogo();
  // Utilise le cache mémoire pour le nom dès le premier render
  const [companyName, setCompanyName] = useState(getCompanyNameSync());
  
  // State for market status data (Commodity prices)
  const [marketStatusData, setMarketStatusData] = useState({
    WTI: 75.50,
    GOLD: 1850.25
  });
  
  useEffect(() => {
    const unsubscribe = companySettingsEmitter.subscribe(() => {
      setCompanyName(getCompanyNameSync());
    });
    return unsubscribe;
  }, []);
  
  // Load market status data for commodities
  useEffect(() => {
    const loadMarketStatusData = () => {
      try {
        // For now, use static data. Later can integrate with real commodity price API
        setMarketStatusData({
          WTI: 75.50 + (Math.random() - 0.5) * 2, // Simulate price movement
          GOLD: 1850.25 + (Math.random() - 0.5) * 20
        });
      } catch (error) {
        console.error('Error loading market status data:', error);
        setMarketStatusData({
          WTI: 75.50,
          GOLD: 1850.25
        });
      }
    };

    loadMarketStatusData();
    
    // Update every 30 seconds
    const interval = setInterval(loadMarketStatusData, 30000);
    return () => clearInterval(interval);
  }, []);
  
  // Découpe le nom pour l'affichage
  const dashIndex = companyName.indexOf(' - ');
  const primaryName = dashIndex === -1 ? companyName : companyName.substring(0, dashIndex).trim();
  const secondaryName = dashIndex === -1 ? '' : companyName.substring(dashIndex + 3).trim();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sidebar className="border-r border-border/40 bg-gradient-to-b from-background to-background/95 sidebar-zoom-adaptive">
      <SidebarHeader className="p-6 border-b border-border/40 sidebar-header">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <img 
              src={logo}
              alt="Company Logo" 
              className="h-10 w-10 object-contain sidebar-logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <Globe className="h-6 w-6 text-primary hidden" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold text-primary mb-1">
              {primaryName}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              {secondaryName}
            </div>
            <h2 className="text-lg font-bold text-foreground">Commodity Risk Manager</h2>
            <p className="text-sm text-muted-foreground">Commodity Hedging Platform</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2 sidebar-content">
        <ScrollArea variant="sidebar" orientation="vertical" className="h-full">
        {/* Core Functions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 sidebar-group-label">
            Core Functions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground sidebar-menu-button"
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="h-4 w-4 shrink-0 sidebar-icon" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs h-5 sidebar-badge">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        {/* Reporting */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 sidebar-group-label">
            Reporting
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground sidebar-menu-button"
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="h-4 w-4 shrink-0 sidebar-icon" />
                      <span className="flex-1">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 sidebar-group-label">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className="group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground sidebar-menu-button"
                  >
                    <Link to={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="h-4 w-4 shrink-0 sidebar-icon" />
                      <span className="flex-1">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Risk Alerts */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2 sidebar-group-label">
            Risk Alerts
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-amber-800 dark:text-amber-200">High Volatility</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400 truncate">WTI above threshold</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-red-800 dark:text-red-200">Exposure Limit</p>
                    <p className="text-xs text-red-600 dark:text-red-400 truncate">Gold exposure at 95%</p>
                  </div>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40 sidebar-footer">
        <div className="space-y-3">
          {/* User Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center sidebar-user-avatar shadow-lg">
                  <User className="h-5 w-5 text-white sidebar-icon" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">
                    {user?.name || 'Commodity Hedge Manager'}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="w-full h-9 bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-400 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-red-500/20 font-medium"
                title="Logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

          {/* Sync Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground sidebar-group-label">
              <span className="font-semibold">Synchronisation</span>
              <SyncIndicator />
            </div>
          </div>

          {/* Market Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground sidebar-group-label">
              <span className="font-semibold">Market Status</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></div>
                <span className="text-emerald-500 dark:text-emerald-400 font-medium">Live</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* WTI Crude Oil Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-orange-900/40 to-orange-800/30 border border-orange-500/30 rounded-lg p-2 market-status-card hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-orange-300/80 market-status-label text-[10px] font-semibold uppercase tracking-wide">WTI Oil</div>
                  <div className="font-mono font-bold text-sm market-status-content text-orange-100 group-hover:text-white transition-colors">${marketStatusData.WTI.toFixed(2)}</div>
                </div>
              </div>
              
              {/* Gold Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-yellow-900/40 to-yellow-800/30 border border-yellow-500/30 rounded-lg p-2 market-status-card hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-yellow-300/80 market-status-label text-[10px] font-semibold uppercase tracking-wide">Gold</div>
                  <div className="font-mono font-bold text-sm market-status-content text-yellow-100 group-hover:text-white transition-colors">${marketStatusData.GOLD.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
} 