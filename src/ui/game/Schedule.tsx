'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/fetch'
import { count } from '@/lib/utils'
import SeasonProgress from './SeasonProgress'

export default function Schedule() {
	const { date, today } = useStorage()
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
			<h2 className="text-center">
				{data.totalGamesInProgress > 0 && (
					<span>{data.totalGamesInProgress} of </span>
				)}
				{count(data.totalGames, 'game')}
			</h2>

			<SeasonProgress data={data} />
		</section>
	)
}
