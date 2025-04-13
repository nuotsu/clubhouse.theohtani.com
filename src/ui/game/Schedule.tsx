'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import { count } from '@/lib/utils'
import GamePreview from './GamePreview'
import GameLive from './GameLive'
import GameFinal from './GameFinal'
import SeasonProgress from './SeasonProgress'

export default function Schedule() {
	const { date } = useStorage()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)

	if (isLoading)
		return (
			<section className="text-center">
				<h2>Loading games...</h2>
			</section>
		)

	if (!data || data.totalGames === 0)
		return (
			<section className="text-center">
				<h2>No games</h2>
			</section>
		)

	return (
		<section>
			<SeasonProgress data={data} />

			<h2 className="text-center">
				{data.totalGamesInProgress > 0 && (
					<span>{data.totalGamesInProgress} of </span>
				)}
				{count(data.totalGames, 'game')}
			</h2>

			<div className="gap-ch grid">
				{data.dates[0].games.map((game, i) => {
					const { codedGameState } = game.status

					if (codedGameState === 'P' || codedGameState === 'S')
						return <GamePreview game={game} index={i} key={game.gamePk} />
					if (codedGameState === 'I')
						return <GameLive game={game} key={game.gamePk} />
					if (codedGameState === 'F')
						return <GameFinal game={game} key={game.gamePk} />
				})}
			</div>
		</section>
	)
}
