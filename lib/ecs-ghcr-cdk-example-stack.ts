import { SecretValue, Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export interface EcsGhcrCdkExampleStackProps extends StackProps {
  /**
   * GitHub Username.
   */
  readonly username: string;
  /**
   * GitHub Private Access Token. Token required following permissions.
   * - read:packages
   *
   * @see https://github.com/settings/tokens/new
   */
  readonly pat: string;
  /**
   * GitHub Container Registry image name.
   *
   * @example "ghcr.io/xxxxx/my-image:latest"
   */
  readonly image: string;
}

export class EcsGhcrCdkExampleStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: EcsGhcrCdkExampleStackProps
  ) {
    super(scope, id, props);

    const vpc = new Vpc(this, "Vpc", {
      natGateways: 1,
    });
    const ecsCredentials = new Secret(this, "ECSCredentials", {
      secretObjectValue: {
        username: SecretValue.unsafePlainText(props.username),
        password: SecretValue.unsafePlainText(props.pat),
      },
    });
    new ApplicationLoadBalancedFargateService(this, "FargateService", {
      vpc,
      taskImageOptions: {
        image: ContainerImage.fromRegistry(props.image, {
          credentials: ecsCredentials,
        }),
      },
    });
  }
}
