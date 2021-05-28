import { observable, action, makeObservable } from 'mobx';
import { fetchDogs, fetchOneDog } from '../api/api';
import { IDogsImages } from '../interfaces/interfaces';

export class DogsStore {
  @observable
  dogsPhotos: IDogsImages[] = [];
  oneDog: IDogsImages[] = [];
  dogId: number | null = null;
  isFetching: boolean = false;
  isDarkMode: boolean = false;

  constructor() {
    makeObservable(this, {
      dogsPhotos: observable,
      oneDog: observable,
      isFetching: observable,
      isDarkMode: observable,
      fetchDogsPhotos: action,
      setDogId: action,
      setDarkMode: action,
    });
  }

  @action
  fetchDogsPhotos = (breedId: number | null) => {
    fetchDogs(breedId).then((data) => (this.dogsPhotos = data));
  };

  @action
  fetchOneDog = (dogId: number | null) => {
    this.isFetching = false;
    fetchOneDog(dogId)
      .then((data) => (this.oneDog = data))
      .finally(() => (this.isFetching = true));
  };

  @action
  setDogId = (id: number) => {
    this.dogId = id;
  };

  @action
  setDarkMode = (darkMode: boolean) => {
    this.isDarkMode = darkMode;
  };
}
