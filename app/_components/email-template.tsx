import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
interface EmailTemplateProps {
  username: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Yelp recent login</Preview>
      <Container>
        <Section style={logo}>
          <Img src={`/logo.svg`} alt="Website logo" />
        </Section>

        <Section style={content}>
          <Row>
            <Img
              style={image}
              width={620}
              src="https://react-email-demo-i1as60qib-resend.vercel.app/static/yelp-header.png"
              alt="Website logo"
            />
          </Row>

          <Row style={{ ...boxInfos, paddingBottom: "0" }}>
            <Column>
              <Heading
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Hi {username},
                <br />
                Order Confirmation 🎉,
              </Heading>
              <Heading
                as="h2"
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Your payment was successful! We&apos;ve sent an email with your
                order details and any digital content you&lsquo;ve purchased.
              </Heading>

              <Text style={paragraph}>
                If this was you, there&apos;s nothing else you need to do.
              </Text>
              <Text style={{ ...paragraph, marginTop: -5 }}>
                If you have any questions, feel free to reach out to our support
                team.
              </Text>
            </Column>
          </Row>
        </Section>

        <Section style={containerImageFooter}>
          <Img
            style={image}
            width={620}
            src="https://react-email-demo-i1as60qib-resend.vercel.app/static/yelp-footer.png"
            alt="Yelp footer decoration"
          />
        </Section>

        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "rgb(0,0,0, 0.7)",
          }}
        >
          © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105,
          U.S.A. | www.yelp.com
        </Text>
      </Container>
    </Body>
  </Html>
);
