export function buildCulturesPayload(form: any) {
  return {
    type: 'cultures',
    attributes: {
      name: form.name,
      culture_type: form.culture_type,
      variety: form.variety,
      harvest_date: form.harvest_date,
      sowing_date: form.sowing_date,
      parcel_id: form.parcel_id,
      polygons_ids: form.polygons,
    },
  };
}

export function planingCulturesPayload(culture_type: string, fields: {}) {
  return {
    type: 'cultures',
    attributes: {
      culture_type: culture_type,
      fields: createDictionaryFields(fields),
    },
  };
}

export function createDictionaryFields(fields: {}) {
  return Object.keys(fields).reduce((acc, key) => {
    acc[key] = [Number(fields[key][0].id)];
    return acc;
  }, {});
}

export function checkValuePresent(obj: any): boolean {
  return Object.keys(obj).some(
    key => obj[key] !== null && obj[key] !== undefined && obj[key] !== ''
  );
}
