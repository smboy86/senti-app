import {
  observable,
  action,
} from 'mobx';
import RootStore from './RootStore';

class UiStore {
  @observable
  public isAuthModalVisible = false;

  @observable
  public isReplyModalVisible = false;

  @observable
  public isImagePickerModalVisible = false;

  constructor(private rootStore: RootStore) { }

  @action
  public toggleAuthModal = () => {
    this.isAuthModalVisible = !this.isAuthModalVisible;
  }

  @action
  public toggleReplyModal = () => {
    this.rootStore.storyStore.pause();
    this.isReplyModalVisible = !this.isReplyModalVisible;
  }

  @action
  public toggleImagePickerModal = () => {
    this.isImagePickerModalVisible = !this.isImagePickerModalVisible;
  }
}

export default UiStore;
