"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Coins, 
  Clock, 
  Repeat, 
  Wallet, 
  Layout, 
  Server, 
  Database, 
  TrendingUp, 
  Activity, 
  Zap,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowLeftRight
} from "lucide-react"

interface ComponentItem {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
}

const COMPONENTS: ComponentItem[] = [
  // DeFi Executable Components
  {
    id: "oneInchSwap",
    name: "1inch Swap",
    description: "Execute token swaps using 1inch aggregation protocol",
    category: "DeFi",
    icon: <Repeat className="w-4 h-4" />
  },
  {
    id: "oneInchQuote",
    name: "1inch Quote",
    description: "Get real-time swap quotes and price data",
    category: "DeFi",
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    id: "fusionPlus",
    name: "Fusion+",
    description: "Cross-chain swaps with MEV protection",
    category: "DeFi",
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: "fusionMonadBridge",
    name: "Fusion Monad Bridge",
    description: "Atomic swaps between Ethereum and Monad using HTLCs",
    category: "Bridge",
    icon: <ArrowLeftRight className="w-4 h-4" />
  },
  {
    id: "chainSelector",
    name: "Chain Selector",
    description: "Select blockchain networks for operations",
    category: "Infrastructure",
    icon: <Server className="w-4 h-4" />
  },

  // UI Components
  {
    id: "tokenInput",
    name: "Token Input",
    description: "Token selection interface",
    category: "UI",
    icon: <Coins className="w-4 h-4" />
  },
  {
    id: "slippageControl",
    name: "Slippage Control",
    description: "Slippage tolerance settings",
    category: "UI",
    icon: <Clock className="w-4 h-4" />
  },
  {
    id: "walletConnector",
    name: "Wallet Connector",
    description: "Connect to Web3 wallets",
    category: "UI",
    icon: <Wallet className="w-4 h-4" />
  },
  {
    id: "swapInterface",
    name: "Swap Interface",
    description: "Complete swap UI component",
    category: "UI",
    icon: <Layout className="w-4 h-4" />
  },

  // Infrastructure
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Data visualization dashboard",
    category: "Infrastructure",
    icon: <Layout className="w-4 h-4" />
  },
  {
    id: "erc20Token",
    name: "ERC20 Token",
    description: "Token creation and management",
    category: "Infrastructure",
    icon: <Coins className="w-4 h-4" />
  },

  // Additional DeFi Components
  {
    id: "fusionSwap",
    name: "Fusion Swap",
    description: "Gasless swaps with MEV protection",
    category: "DeFi",
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: "limitOrder",
    name: "Limit Order",
    description: "Place limit orders on DEX",
    category: "DeFi",
    icon: <Clock className="w-4 h-4" />
  },
  {
    id: "portfolioAPI",
    name: "Portfolio API",
    description: "Portfolio tracking and analytics",
    category: "Analytics",
    icon: <TrendingUp className="w-4 h-4" />
  },
  {
    id: "defiDashboard",
    name: "DeFi Dashboard",
    description: "Complete DeFi dashboard interface",
    category: "UI",
    icon: <Layout className="w-4 h-4" />
  },
  {
    id: "transactionHistory",
    name: "Transaction History",
    description: "Transaction tracking and history",
    category: "Analytics",
    icon: <Activity className="w-4 h-4" />
  },
  {
    id: "swapAPI",
    name: "Swap API",
    description: "Backend API for swap operations",
    category: "Infrastructure",
    icon: <Server className="w-4 h-4" />
  },
  {
    id: "tokenDataService",
    name: "Token Data Service",
    description: "Token price and metadata service",
    category: "Infrastructure",
    icon: <Database className="w-4 h-4" />
  }
]

const CATEGORIES = ["All", "DeFi", "Bridge", "UI", "Infrastructure", "Analytics"]

export function ComponentPalette() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["DeFi"]))

  const filteredComponents = COMPONENTS.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  const groupedComponents = CATEGORIES.slice(1).reduce((acc, category) => {
    acc[category] = filteredComponents.filter(comp => comp.category === category)
    return acc
  }, {} as Record<string, ComponentItem[]>)

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col h-full max-h-screen">
      <div className="p-2 sm:p-4 border-b">
        <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Components</h2>
        
        {/* Search */}
        <div className="relative mb-2 sm:mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {CATEGORIES.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4">
        {selectedCategory === "All" ? (
          // Show grouped by category
          Object.entries(groupedComponents).map(([category, components]) => (
            <div key={category} className="space-y-1 sm:space-y-2">
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center gap-2 w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {expandedCategories.has(category) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                {category} ({components.length})
              </button>
              
              {expandedCategories.has(category) && (
                <div className="pl-6 space-y-1 sm:space-y-2">
                  {components.map(component => (
                    <ComponentCard
                      key={component.id}
                      component={component}
                      onDragStart={onDragStart}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          // Show flat list for specific category
          <div className="space-y-1 sm:space-y-2">
            {filteredComponents.map(component => (
              <ComponentCard
                key={component.id}
                component={component}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        )}

        {filteredComponents.length === 0 && (
          <div className="text-center text-gray-500 py-4 sm:py-8">
            <Search className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No components found</p>
            <p className="text-xs">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-2 sm:p-4 border-t bg-gray-50">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="font-medium">💡 How to use:</div>
          <div className="hidden sm:block">• Drag components to the canvas</div>
          <div className="hidden sm:block">• Connect nodes to create workflows</div>
          <div className="hidden sm:block">• Click nodes to configure them</div>
          <div className="sm:hidden">• Tap components to add</div>
          <div className="sm:hidden">• Long press to configure</div>
        </div>
      </div>
    </div>
  )
}

function ComponentCard({ 
  component, 
  onDragStart 
}: { 
  component: ComponentItem
  onDragStart: (event: React.DragEvent, nodeType: string) => void 
}) {
  return (
    <Card
      className="cursor-grab hover:shadow-md transition-shadow border border-gray-200"
      draggable
      onDragStart={(event) => onDragStart(event, component.id)}
    >
      <CardContent className="p-2 sm:p-3">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="flex-shrink-0 p-1.5 sm:p-2 bg-blue-50 rounded-lg">
            {component.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-xs sm:text-sm text-gray-900 mb-1 truncate">
              {component.name}
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {component.description}
            </p>
            <Badge variant="outline" className="mt-1 sm:mt-2 text-xs">
              {component.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
