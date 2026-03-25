import { findEncounterForZone } from '../services/encounterService.js'
import { getAllPokemonRows } from '../services/pokemonCatalogService.js'
import {
  catchPokemon,
  countTeam,
  demoteToBox,
  listBox,
  listHistory,
  listRecentCatches,
  listTeam,
  promoteFromBox,
  totalCaught,
} from '../services/userPokemonService.js'

export async function getCatalog(req, res, next) {
  try {
    const rows = await getAllPokemonRows()
    res.json({
      count: rows.length,
      pokemon: rows.map((r) => ({
        pokeapi_id: r.pokeapi_id,
        name: r.name,
        sprite_url: r.sprite_url,
        types: r.types,
      })),
    })
  } catch (e) {
    next(e)
  }
}

export async function findEncounter(req, res, next) {
  try {
    const zone = req.query.zone
    const result = await findEncounterForZone(zone)
    res.json(result)
  } catch (e) {
    next(e)
  }
}

export async function postCatch(req, res, next) {
  try {
    const userId = req.user.id
    const {
      pokeapi_id: pokeapiId,
      zone,
      learned_moves: learnedMoves,
      stats_snapshot: statsSnapshot,
      force_box: forceBox,
    } = req.body || {}
    if (pokeapiId == null) {
      return res.status(400).json({ error: 'pokeapi_id required' })
    }
    const result = await catchPokemon({
      userId,
      pokeapiId: Number(pokeapiId),
      zoneKey: zone || null,
      learnedMoves,
      statsSnapshot,
      forceBox: Boolean(forceBox),
    })
    res.status(201).json(result)
  } catch (e) {
    next(e)
  }
}

export async function getTeam(req, res, next) {
  try {
    const team = await listTeam(req.user.id)
    res.json({ team, count: team.length })
  } catch (e) {
    next(e)
  }
}

export async function patchTeam(req, res, next) {
  try {
    const { promote_user_pokemon_id: promoteId, demote_user_pokemon_id: demoteId } =
      req.body || {}
    if (promoteId) {
      const updated = await promoteFromBox(req.user.id, promoteId)
      return res.json({ updated, action: 'promoted' })
    }
    if (demoteId) {
      const updated = await demoteToBox(req.user.id, demoteId)
      return res.json({ updated, action: 'demoted' })
    }
    return res.status(400).json({
      error: 'Provide promote_user_pokemon_id or demote_user_pokemon_id',
    })
  } catch (e) {
    next(e)
  }
}

export async function getBox(req, res, next) {
  try {
    const box = await listBox(req.user.id)
    res.json({ box, count: box.length })
  } catch (e) {
    next(e)
  }
}

export async function patchBox(req, res, next) {
  try {
    const { promote_user_pokemon_id: promoteId } = req.body || {}
    if (!promoteId) {
      return res.status(400).json({ error: 'promote_user_pokemon_id required' })
    }
    const updated = await promoteFromBox(req.user.id, promoteId)
    res.json({ updated, action: 'promoted_to_team' })
  } catch (e) {
    next(e)
  }
}

export async function getHistory(req, res, next) {
  try {
    const history = await listHistory(req.user.id)
    res.json({ history })
  } catch (e) {
    next(e)
  }
}

export async function getDashboard(req, res, next) {
  try {
    const userId = req.user.id
    const [team, box, recent, history, total, teamCount] = await Promise.all([
      listTeam(userId),
      listBox(userId),
      listRecentCatches(userId, 5),
      listHistory(userId, 20),
      totalCaught(userId),
      countTeam(userId),
    ])
    res.json({
      team,
      box_count: box.length,
      team_count: teamCount,
      recent_catches: recent,
      catch_history: history,
      total_caught: total,
    })
  } catch (e) {
    next(e)
  }
}
