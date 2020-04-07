import React from 'react'
import { Segment, Grid, Header, Container, Divider, Dropdown, Icon, Form, Button } from 'semantic-ui-react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RatingDisplay from '../RatingDisplay'

const countryOptions = [
    { key: 'af', value: 'af', text: 'Afghanistan' },
    { key: 'ax', value: 'ax', text: 'Aland Islands' },
    { key: 'al', value: 'al', text: 'Albania' },
    { key: 'dz', value: 'dz', text: 'Algeria' },
    { key: 'as', value: 'as', text: 'American Samoa' },
    { key: 'ad', value: 'ad', text: 'Andorra' },
    { key: 'ao', value: 'ao', text: 'Angola' },
    { key: 'ai', value: 'ai', text: 'Anguilla' },
    { key: 'ag', value: 'ag', text: 'Antigua' },
    { key: 'ar', value: 'ar', text: 'Argentina' },
    { key: 'am', value: 'am', text: 'Armenia' },
    { key: 'aw', value: 'aw', text: 'Aruba' },
    { key: 'au', value: 'au', text: 'Australia' },
    { key: 'at', value: 'at', text: 'Austria' },
    { key: 'az', value: 'az', text: 'Azerbaijan' },
    { key: 'bs', value: 'bs', text: 'Bahamas' },
    { key: 'bh', value: 'bh', text: 'Bahrain' },
    { key: 'bd', value: 'bd', text: 'Bangladesh' },
    { key: 'bb', value: 'bb', text: 'Barbados' },
    { key: 'by', value: 'by', text: 'Belarus' },
    { key: 'be', value: 'be', text: 'Belgium' },
    { key: 'bz', value: 'bz', text: 'Belize' },
    { key: 'bj', value: 'bj', text: 'Benin' },
  ]

const ItemPage = () => (
    <Segment>
        <Grid columns={2} divided>
            <Grid.Column>
                <Segment basic>
                    <Carousel showArrows={true} infiniteLoop={true} showIndicators={false} >
                        <div>
                            <img src="https://dellstore.pk/wp-content/uploads/2019/11/Dell-XPS-15-7590-High-Performance-With-Infinity-Edge-9th-Gen-Core-i9-MultiCore-Coffee-Lake-Processor-32GB-1-TB-SSD-4-GB-Nvidia-GeForce-GTX1650-GDDR5-15.6-4K-Ultra.jpg" />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src="https://i.dell.com/sites/csimages/Video_Imagery/all/xps_7590_touch.png" />
                            <p className="legend">Legend 2</p>
                        </div>
                    </Carousel>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment basic>
                    <Header size='huge'>Item Name</Header>
                    <RatingDisplay />
                    <Divider />
                    <Container textAlign='justified'>
                        <p>
                            Description of the product
                        </p>
                    </Container>
                    <Divider />
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column textAlign='right' width={4}>
                                <p>
                                    attribute name :
                                </p>
                            </Grid.Column>
                            <Grid.Column textAlign='left' width={12}>
                                <p>
                                    attribute value
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='right' width={4}>
                                <p>
                                    attribute name :
                                </p>
                            </Grid.Column>
                            <Grid.Column textAlign='left' width={12}>
                                <p>
                                    attribute value
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider />

                    <Form>
                        <Form.Field>
                            <Dropdown fluid placeholder='Select size' options={countryOptions} />
                        </Form.Field>
                        <Divider />
                        <Form.Field>
                            <Dropdown fluid placeholder='Select color' options={countryOptions} />
                        </Form.Field>
                        <Divider />
                        <Container textAlign='center' style={{ color: 'red' }}>
                            <Icon name='money bill alternate outline' />
                        $ 1000
                    </Container>
                    </Form>
                                       
                </Segment>
            </Grid.Column>
        </Grid>
    </Segment>
)

export default ItemPage