import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamList } from '../navigation/AppNavigator';
import { Note } from '../types/note/note';

export type DetailsScreenRouteProp = NativeStackScreenProps<StackParamList, 'Details'>;

export interface DetailsScreenRouteProps {
  route: DetailsScreenRouteProp;
}

export interface DetailsScreenProps {
  note?: Note;
}
