type Highlights = {
  name: string;
  reason: string;
}

type Attraction = {
  name: string;
  description: string;
  type: string;
  estimated_visit_time: string;
}

type TransportOptions = {
  type: string;
  description: string;
  travel_time: string;
  cost: string;
}

export type Result = {
  message: string
  details: {
    city: string;
    country: string;
    description: string;
    attractions: Attraction[]
    highlights: Highlights[]
    airport_transport: {
      options: TransportOptions[]
      tips: string
    }
    public_transport: {
      available_modes: {
        type: string;
        cost: string;
      }[]
      apps: string[]
      tips: string
    }
  }
}


