import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Contact, ContactType } from '../models/Contact';
import { ContactRow } from '../components/ContactRow';
import { Styles } from '../Styles';
import { IDataProvider } from '../data/IDataProvider';

export interface ContactDetailsPageProps {
  dataProvider: IDataProvider;
}

interface ContactDetailsState {
  contacts: Contact[];
}

export class ContactDetailsPage extends React.Component<ContactDetailsPageProps, ContactDetailsState> {
  constructor(props: ContactDetailsPageProps) {
    super(props);

    this.state = {
      contacts: []
    }
  }

  getContactTypeString = (contactType: ContactType) => {
    switch (contactType) {
       case ContactType.Legislator:
        return "Legislators";
      case ContactType.MunicipalLeader:
        return "Municipal leaders";
      case ContactType.School:
        return "School contacts";
      case ContactType.PublicSafety:
        return "Public safety contacts";
      case ContactType.ParksAndRecreation:
        return "Parks and recreation contacts";
      case ContactType.PublicWorks:
        return "Public works contacts";
    }
  }

  componentWillMount() {
    const { dataProvider } = this.props;
    const contactType: ContactType = this.props.navigation.state.params.contactType;

    dataProvider.getContacts(contactType).then(contacts => {
      this.setState({
        contacts: contacts
      });
    });
  }

  render() {
    const { contacts } = this.state;
    const contactType: ContactType = this.props.navigation.state.params.contactType;
    let contactList = contacts.map(c => <ContactRow
      key={c.Id}
      contact={c}
    />);

    let contactTypeString = this.getContactTypeString(contactType);

    return (
      <View style={[ Styles.appPageStyle ]}>
        <View style={[ Styles.pageHeader ]}>
          <Text style={[ Styles.largeFont, Styles.appHorizontalMargin, Styles.colorBlack ]}>{contactTypeString}</Text>
        </View>
        <ScrollView style={ Styles.scrollView }>
          {contactList}
        </ScrollView>
      </View>       
    );
  }
}