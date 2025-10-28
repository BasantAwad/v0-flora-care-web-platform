"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Globe, Star, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Store {
  id: string
  name: string
  type: "nursery" | "greenhouse" | "garden-center"
  address: string
  phone: string
  website: string
  rating: number
  reviews: number
  distance: number
  hours: string
  lat: number
  lng: number
}

export default function FinderPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [filteredStores, setFilteredStores] = useState<Store[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<"all" | "nursery" | "greenhouse" | "garden-center">("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Mock store data with coordinates
    const mockStores: Store[] = [
      {
        id: "1",
        name: "Green Haven Nursery",
        type: "nursery",
        address: "123 Plant Street, Garden City, CA 90210",
        phone: "(555) 123-4567",
        website: "www.greenhavenursery.com",
        rating: 4.8,
        reviews: 156,
        distance: 0.5,
        hours: "Mon-Sat: 9AM-6PM, Sun: 10AM-5PM",
        lat: 34.0522,
        lng: -118.2437,
      },
      {
        id: "2",
        name: "Tropical Greenhouse",
        type: "greenhouse",
        address: "456 Botanical Ave, Plant Valley, CA 90211",
        phone: "(555) 234-5678",
        website: "www.tropicalgreenhouse.com",
        rating: 4.6,
        reviews: 89,
        distance: 1.2,
        hours: "Daily: 8AM-7PM",
        lat: 34.0622,
        lng: -118.2537,
      },
      {
        id: "3",
        name: "Urban Garden Center",
        type: "garden-center",
        address: "789 Leaf Lane, Bloom Town, CA 90212",
        phone: "(555) 345-6789",
        website: "www.urbangardencenter.com",
        rating: 4.7,
        reviews: 203,
        distance: 2.1,
        hours: "Mon-Sun: 9AM-8PM",
        lat: 34.0722,
        lng: -118.2637,
      },
      {
        id: "4",
        name: "Succulent Paradise",
        type: "nursery",
        address: "321 Desert Rose Rd, Cactus City, CA 90213",
        phone: "(555) 456-7890",
        website: "www.succulentparadise.com",
        rating: 4.9,
        reviews: 127,
        distance: 3.5,
        hours: "Tue-Sun: 10AM-6PM, Closed Mondays",
        lat: 34.0822,
        lng: -118.2737,
      },
      {
        id: "5",
        name: "Rare Plants Collective",
        type: "greenhouse",
        address: "654 Exotic Blvd, Specialty Gardens, CA 90214",
        phone: "(555) 567-8901",
        website: "www.rareplantscollective.com",
        rating: 4.5,
        reviews: 64,
        distance: 4.2,
        hours: "Wed-Sun: 11AM-5PM, Closed Mon-Tue",
        lat: 34.0922,
        lng: -118.2837,
      },
      {
        id: "6",
        name: "Community Plant Swap",
        type: "garden-center",
        address: "987 Community Way, Neighborhood, CA 90215",
        phone: "(555) 678-9012",
        website: "www.communityplantswap.com",
        rating: 4.4,
        reviews: 45,
        distance: 1.8,
        hours: "Sat-Sun: 10AM-4PM",
        lat: 34.0422,
        lng: -118.2337,
      },
    ]

    setStores(mockStores)
    setFilteredStores(mockStores)

    // Simulate getting user location
    setUserLocation({ lat: 34.0522, lng: -118.2437 })
  }, [])

  useEffect(() => {
    let filtered = stores

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((store) => store.type === selectedType)
    }

    // Sort by distance
    filtered.sort((a, b) => a.distance - b.distance)

    setFilteredStores(filtered)
  }, [searchQuery, selectedType, stores])

  const handleGetDirections = (store: Store) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}&destination_place_id=${store.id}`
    window.open(mapsUrl, "_blank")
  }

  const typeColor: Record<string, string> = {
    nursery: "bg-green-100 text-green-800",
    greenhouse: "bg-blue-100 text-blue-800",
    "garden-center": "bg-purple-100 text-purple-800",
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Local Plant Stores</h1>
          <p className="text-muted-foreground">Discover nurseries, greenhouses, and garden centers near you</p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4 mb-8">
          <Input
            placeholder="Search by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary border-border"
          />

          <div className="flex gap-2 flex-wrap">
            {(["all", "nursery", "greenhouse", "garden-center"] as const).map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className={selectedType === type ? "bg-primary text-primary-foreground" : ""}
              >
                {type === "all"
                  ? "All Stores"
                  : type.replace("-", " ").charAt(0).toUpperCase() + type.replace("-", " ").slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Stores List */}
        <div className="space-y-4">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <Card key={store.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{store.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={typeColor[store.type]}>{store.type.replace("-", " ")}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{store.rating}</span>
                          <span className="text-xs text-muted-foreground">({store.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{store.distance} mi</p>
                      <p className="text-xs text-muted-foreground">away</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{store.address}</p>
                      <p className="text-xs text-muted-foreground mt-1">{store.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href={`tel:${store.phone}`} className="text-sm text-primary hover:text-accent">
                      {store.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                    <a
                      href={`https://${store.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-accent"
                    >
                      {store.website}
                    </a>
                  </div>

                  <Button
                    onClick={() => handleGetDirections(store)}
                    className="w-full bg-primary hover:bg-accent text-primary-foreground mt-4"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <MapPin className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No stores found matching your search</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
