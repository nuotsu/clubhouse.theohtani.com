export default function Header() {
	return (
		<header>
			<h1 className="flex flex-wrap items-center justify-center gap-x-[.5ch]">
				<small className="-mr-0.5 tracking-tighter uppercase">The</small>
				<strong className="text-3xl tracking-tighter uppercase">
					Clubhouse
				</strong>{' '}
				<small className="max-w-min text-[x-small] leading-none">
					MLB Scorebug
				</small>
			</h1>
		</header>
	)
}
