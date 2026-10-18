<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project architecture (MT Holidays)
- All data access goes through `src/services/*` (mock data in `src/data/*`, `USE_API` flag in `apiClient.ts`) — so the future Express/MongoDB API swaps in without touching components.
- Pricing shown in the browser is a demo estimate only; the backend `POST /api/pricing/calculate` will be the authority.
- Routing uses TanStack Router (file routes in `src/routes`) — it is the framework's fixed router; React Router is not used.
