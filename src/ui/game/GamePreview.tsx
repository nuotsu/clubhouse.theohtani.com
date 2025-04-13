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
	const { data } = fetchMLBLive<MLB.LiveData>(game.link)

	return (
		<article
			className="-order-1 mx-auto max-w-max text-center font-bold uppercase"
			style={{ '--delay': `${index * 20}ms` } as React.CSSProperties}
		>
			<div className="flex flex-wrap items-end justify-center gap-x-[.5ch]">
				<Team team={data?.gameData.teams.away} className="[--x:-.5ch]" />
				<span className="text-sm">vs</span>
				<Team team={data?.gameData.teams.home} className="[--x:.5ch]" />
			</div>

			<hr className="anim-scale-x duration-700" />

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
	team,
	className,
}: {
	team?: MLB.LiveTeam
} & React.ComponentProps<'strong'>) {
	return (
		<strong
			className={cn(
				'anim-fade group grid place-content-center text-2xl leading-none opacity-0 *:col-span-full *:row-span-full sm:text-3xl',
				className,
			)}
		>
			<span className="transition-all group-hover:opacity-50 group-hover:blur-xs">
				{team?.clubName || <span>TBD</span>}
			</span>

			<span className="m-auto text-xl/none transition-opacity group-[&:not(:hover)]:opacity-0">
				{team?.record.wins}-{team?.record.losses}
			</span>
		</strong>
	)
}
