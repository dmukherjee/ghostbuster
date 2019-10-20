import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, Card, Icon, Button, Header } from 'semantic-ui-react';

export default class StudentPrDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllAttemptedToyProblems: false
    };
    this.showHideDetails = this.showHideDetails.bind(this);
  }

  showHideDetails() {
    const { showAllAttemptedToyProblems } = this.state;
    this.setState({ showAllAttemptedToyProblems: !showAllAttemptedToyProblems });
  }

  render() {
    const { pullRequestsList, selectedCohort, releasedToyProblems } = this.props;
    const { showAllAttemptedToyProblems } = this.state;

    pullRequestsList.forEach(item =>
      Object.assign(item, {
        incompleteProblems: releasedToyProblems.filter(
          problem => !item.matchedFileNames.includes(problem)
        )
      })
    );

    return (
      <div>
        <br />
        {pullRequestsList && pullRequestsList.length ? (
          <div>
            <Header as="h1">
              {`Selected Cohort: ${selectedCohort.toUpperCase()}`}
              <Button
                color="grey"
                style={{ float: 'right', marginRight: '0px' }}
                onClick={() => this.showHideDetails()}
              >
                {showAllAttemptedToyProblems ? 'Hide Details' : 'Show Details'}
              </Button>
            </Header>
            <div>
              {releasedToyProblems &&
                releasedToyProblems.length &&
                releasedToyProblems.map(name => <div key={name}>{name}</div>)}
            </div>
            <Card.Group itemsPerRow={2}>
              {pullRequestsList.map(item => (
                <Card key={item.studentName} style={{ marginBottom: '0px' }}>
                  <Card.Content style={{ paddingBottom: '0px' }}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://github.com/hackreactor/${
                        item.cohort
                      }-toy-problems/pulls?q=is:pr+author:${item.studentGithubHandle}`}
                    >
                      <Card.Header style={{ marginBottom: '10px' }}>
                        <Label size="big" color="teal">
                          <Icon name="github" />
                          {item.studentName}
                        </Label>
                        <Label
                          size="big"
                          color="teal"
                          style={{ float: 'right', marginRight: '30px' }}
                        >
                          <Icon name="calculator" />
                          {item.matchedFilesCount}
                        </Label>
                      </Card.Header>
                    </a>
                    <Card.Description />
                    {showAllAttemptedToyProblems ? (
                      <React.Fragment>
                        <h1>Attempted:</h1>
                        <div>
                          {item.matchedFileNames &&
                            item.matchedFileNames.length &&
                            item.matchedFileNames.map(pr => <div key={pr}>{pr}</div>)}
                        </div>
                        <h1>Not Attempted:</h1>
                        <div>
                          {item.incompleteProblems &&
                            item.incompleteProblems.length &&
                            item.incompleteProblems.map(name => <div key={name}>{name}</div>)}
                        </div>
                      </React.Fragment>
                    ) : (
                      <div />
                    )}
                    <br />
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </div>
        ) : (
          <div style={{ margin: '30px', fontSize: '40px', fontWeight: 'bold' }}>
            {`No Pull Request found for ${selectedCohort.toUpperCase()}`}
          </div>
        )}
      </div>
    );
  }
}

StudentPrDetails.propTypes = {
  pullRequestsList: PropTypes.instanceOf(Array).isRequired,
  releasedToyProblems: PropTypes.instanceOf(Array).isRequired,
  selectedCohort: PropTypes.string.isRequired
};
