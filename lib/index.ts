import { nineClubApi, worldTourApi } from './api'

function main() {
  return worldTourApi.list()
}

main().then(console.log)
