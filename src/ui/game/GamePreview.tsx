'use client'

import { fetchMLBLive } from '@/lib/fetch'
import { cn } from '@/lib/utils'

export default function GamePreview({
	game,
	index = 0,
}: {
	game: MLB.ScheduleGame
	index?: number
}) {
	return (
		<article
			className="-order-1 mx-auto max-w-max text-center font-bold uppercase"
			style={{ '--delay': `${index * 20}ms` } as React.CSSProperties}
		>
			<div className="flex flex-wrap items-end justify-center gap-x-[.5ch]">
				<Team unresolvedTeam={game.teams.away.team} className="[--x:-.5ch]" />
				<span className="text-sm">vs</span>
				<Team unresolvedTeam={game.teams.home.team} className="[--x:.5ch]" />
			</div>

			<hr className="anim-scale-x duration-700x" />

			<time className="font-sub" dateTime={game.gameDate}>
				{new Date(game.gameDate).toLocaleTimeString('en-US', {
					hour: 'numeric',
					minute: '2-digit',
					timeZoneName: 'short',
				})}
			</time>
		</article>
	)
}

function Team({
	unresolvedTeam,
	className,
}: {
	unresolvedTeam: MLB.ScheduleTeam['team']
} & React.ComponentProps<'strong'>) {
	const { data } = fetchMLBLive<{ teams: MLB.Team[] }>(unresolvedTeam.link, {
		refreshInterval: 1000 * 60,
	})
	const team = data?.teams[0]

	return (
		<strong
			className={cn(
				'anim-fade text-2xl leading-none opacity-0 sm:text-3xl',
				className,
			)}
		>
			{team?.clubName}
		</strong>
	)
}
