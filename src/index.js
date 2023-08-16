import { Command } from 'commander'
import NeteaseCloudMusicApi from 'NeteaseCloudMusicApi'
const { album, lyric } = NeteaseCloudMusicApi
import chalk from 'chalk'

const program = new Command()

program.name('NeteaseCloudMusicCLI')

program
  .command('album')
  .description('get album info')
  .arguments('<id>')
  .action(async id => {
    const res = await album({ id })

    console.log(
      `${chalk.bold.cyanBright(res.body.album.name)} ${chalk.grey('by')} ${
        res.body.album.artist.name
      }`,
    )

    res.body.songs.map((song, i) => {
      console.log(
        `${chalk.grey(song.id)} ${chalk.greenBright(
          '#' + (i + 1),
        )}\t${chalk.cyan(song.name)}`,
      )
    })
  })

program
  .command('lyric')
  .description('get lyrics')
  .arguments('<id>')
  .action(async id => {
    const res = await lyric({ id })

    console.log(res.body.lrc.lyric)
  })

program.parse()
