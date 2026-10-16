# Qi Guo · Research & Engineering

Claude-inspired public academic homepage featuring research interests, five publications, and recent projects. Chinese / English, responsive navigation, paper search and topic filters, BibTeX citations, and project summaries. No build dependencies or backend.

## Files

- `docs/index.html`: biography, research, papers, and projects.
- `docs/styles.css`: responsive visual design.
- `docs/app.js`: interactions and bilingual UI.
- `docs/citations.js` and `docs/publications.bib`: citation records.

## Publish on GitHub Pages

With GitHub CLI authenticated as `ClimbHillTmr`, run `bash deploy.sh` from this directory. It commits only the public website files, creates the public repository if missing, pushes without force, and configures Pages to serve `/docs` from `main`. It stops if the authenticated account or existing Git remote differs from the expected destination. Network access to GitHub is required.

Publish this repository as `ClimbHillTmr/WebMe`. In Settings → Pages select **Deploy from a branch**, branch **main**, folder **/docs**, then Save. The intended URL is https://climbhilltmr.github.io/WebMe/ (available only after deployment succeeds).

Future commits to `main` update the public website automatically. Edit paper entries and both citation files together. Project summaries distinguish ongoing research from published work.

## Preview

Open `docs/index.html` directly, or run `python3 -m http.server 4173 --directory docs` and visit http://localhost:4173.

Content is based on the owner's current CV and research context. The MEMS publication and equal-contribution author designation were cross-checked against https://pubmed.ncbi.nlm.nih.gov/42750262/ on 2026-10-15. Other paper metadata follows DOI-linked CV entries. No private patient data or personal health information is included.
