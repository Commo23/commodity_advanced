import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Cloud, CloudOff, RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { useAutoSync } from '../hooks/useAutoSync'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

interface SyncIndicatorProps {
  className?: string
  showDetails?: boolean
}

export const SyncIndicator: React.FC<SyncIndicatorProps> = ({ 
  className = "", 
  showDetails = false 
}) => {
  const { 
    isConnected, 
    lastSync, 
    hasPendingChanges, 
    autoSyncEnabled, 
    syncNow 
  } = useAutoSync()

  const getStatusIcon = () => {
    if (!isConnected) {
      return <CloudOff className="h-3 w-3" />
    }
    
    if (hasPendingChanges) {
      return <Clock className="h-3 w-3 animate-pulse" />
    }
    
    if (lastSync) {
      return <CheckCircle className="h-3 w-3" />
    }
    
    return <Cloud className="h-3 w-3" />
  }

  const getStatusColor = () => {
    if (!isConnected) return "text-red-600 border-red-200"
    if (hasPendingChanges) return "text-yellow-600 border-yellow-200"
    if (lastSync) return "text-green-600 border-green-200"
    return "text-gray-600 border-gray-200"
  }

  const getStatusText = () => {
    if (!isConnected) return "Hors ligne"
    if (hasPendingChanges) return "Synchronisation en attente"
    if (lastSync) return "Synchronisé"
    return "Prêt"
  }

  const formatLastSync = () => {
    if (!lastSync) return "Jamais"
    
    const now = new Date()
    const diff = now.getTime() - lastSync.getTime()
    const minutes = Math.floor(diff / 60000)
    
    if (minutes < 1) return "À l'instant"
    if (minutes < 60) return `Il y a ${minutes}min`
    
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `Il y a ${hours}h`
    
    const days = Math.floor(hours / 24)
    return `Il y a ${days}j`
  }

  if (showDetails) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline" className={`${getStatusColor()} cursor-help`}>
                {getStatusIcon()}
                <span className="ml-1">{getStatusText()}</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <div>Statut: {getStatusText()}</div>
                <div>Dernière sync: {formatLastSync()}</div>
                <div>Auto-sync: {autoSyncEnabled ? 'Activé' : 'Désactivé'}</div>
                {hasPendingChanges && (
                  <div className="text-yellow-600">Changements en attente</div>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {hasPendingChanges && (
          <Button
            onClick={syncNow}
            size="sm"
            variant="outline"
            className="h-6 px-2"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`${getStatusColor()} cursor-help ${className}`}>
            {getStatusIcon()}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <div>Supabase: {getStatusText()}</div>
            <div>Dernière sync: {formatLastSync()}</div>
            {hasPendingChanges && (
              <div className="text-yellow-600">Changements en attente</div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
