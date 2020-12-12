export interface ItemBase {
    executeDailyUpdate(): void;
    getName(): string;
    getQuality(): number;
    getSellingDaysLimit(): number;
}
