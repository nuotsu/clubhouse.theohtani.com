'use client'

import { useStorage } from '@/lib/store'
import { cn } from '@/lib/utils'
import css from './SeasonProgress.module.css'

const MAX = 162

export default function SeasonProgress({ data }: { data: MLB.Schedule }) {
	const { games } = data.dates[0]
	const gameCounts = games
		.flatMap((game) => Object.values(game.teams) as MLB.ScheduleTeam[])
		.map((team) => team.leagueRecord.wins + team.leagueRecord.losses)

	const { today } = useStorage()

	const avg = Math.round(
		gameCounts.reduce((a, b) => a + b, 0) / gameCounts.length,
	)

	return (
		<div className={cn(css.root, 'grid items-stretch gap-x-[.5ch] uppercase')}>
			<div
				className="mr-auto [grid-area:current]"
				style={{ marginLeft: `calc(100% * ${avg / MAX})` }}
			>
				<div className="grid -translate-x-1/2 text-center">
					<small className="text-[xx-small]/1 font-bold">Game</small>
					<b className="text-2xl/[1]">{avg}</b>
				</div>
			</div>

			<div
				className={cn(
					css.progress,
					'relative flex flex-col justify-center border-r [grid-area:progress]',
				)}
				style={
					{
						'--max': MAX,
						'--progress': `calc(100% * ${avg / MAX})`,
					} as React.CSSProperties
				}
			/>

			<b className="text-lg/[1] [grid-area:first]">01</b>
			<b className="text-lg/[1] [grid-area:last]">{MAX}</b>
		</div>
	)
}
