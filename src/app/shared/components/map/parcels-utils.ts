export function buildParcelsPayload(name: string, topographic_number: number, userID: number, parcels: any[]) {
  return {
    type: 'parcels',
    attributes: {
      name,
      topographic_number
    },
    relationships: {
      user: {
        data: {
          type: 'users',
          id: String(userID)
        }
      },
      polygons: {
        data: buildPolygonPayload(parcels)
      }
    }
  };
}

export function buildParcelsUpdatePayload(name: string, topographic_number: number, userID: number, parcels: any[], id: number) {
  return {
    data: {
      type: 'parcels',
      id: String(id),
      attributes: {
        name,
        topographic_number
      },
      relationships: {
        user: {
          data: {
            type: 'users',
            id: String(userID)
          }
        },
        polygons: {
          data: buildPolygonPayload(parcels)
        }
      }
    }
  };
}

export function buildPolygonPayload(parcels: any) {
  const data = [];
  parcels?.forEach((coordinates: string[][]) => {
    data.push({
      type: 'polygons',
      attributes: {
        coordinates: coordinates
      }
    });
  });
  return data;
}
