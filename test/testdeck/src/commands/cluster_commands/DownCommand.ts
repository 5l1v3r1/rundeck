import {Argv} from 'yargs'

import { ClusterFactory } from '../../ClusterManager'

import {Config} from '../../Config'

interface Opts {
    config: string
    image: string
}

class ProvisionCommand {
    command = "down"
    describe = "Bring Down a cluster"

    builder(yargs: Argv) {
        return yargs
            .option('config', {
                describe: 'Cluster configuration location',
                type: 'string'
            })
    }

    async handler(opts: Opts) {
        const config = await Config.Load('./config.yml', './config.user.yml')

        const clusterConfig = {
            image: opts.image || config.baseImage,
            licenseFile: config.licenseFile
        }

        const cluster = await ClusterFactory.CreateCluster(opts.config || config.clusterConfig, clusterConfig)

        await cluster.stopCluster()
    }
}

module.exports = new ProvisionCommand()
