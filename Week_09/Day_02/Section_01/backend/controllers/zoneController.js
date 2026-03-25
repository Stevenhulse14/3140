/**
 * Exposes static zone metadata for the frontend (labels + keys).
 *
 * Encounter *filtering* by type uses the same keys in config/zones.js;
 * this endpoint lets the UI stay in sync without duplicating the list of zones.
 */
import { listZones } from '../config/zones.js'

export function getZones(req, res) {
  res.json({ zones: listZones() })
}
