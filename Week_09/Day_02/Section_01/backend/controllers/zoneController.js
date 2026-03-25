import { listZones } from '../config/zones.js'

export function getZones(req, res) {
  res.json({ zones: listZones() })
}
