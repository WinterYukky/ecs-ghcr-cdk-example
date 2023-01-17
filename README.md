# ECS ghcr CDK Example

This is a example project for ECS Fargate with ghcr (i.e private registry).

## How to deploy

1. Get your GitHub PAT.
   1. Access https://github.com/settings/tokens/new
   1. Check the `write:packages`
   1. Click generate token button.
1. Run following the command for prepush a image.
   1. `docker login ghcr.io -u <Your GitHub Name> --password <Your GitHub PAT>`
   1. `docker tag nginx:latest ghcr.io/<Your GitHub name>/nginx:latest`
   1. `docker push ghcr.io/<Your GitHub name>/nginx:latest`
1. Edit `bin/ecs-ghcr-cdk-example.ts` with your GitHub information.
1. Run `yarn cdk deploy` command.
1. Access the outputed URL by CDK

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
