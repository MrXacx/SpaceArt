<?php

namespace App\Util\Tool;

trait Location {
    private string $CEP;
    private string $address;
    private string $district;
    private string $city;
    private string $federation;

    /**
     * @param string $CEP
     */
    public function setCEP(string $CEP): void
    {
        $this->CEP = $CEP;
    }

    /** 
     * @return string CEP
     */
    public function getCEP(): string
    {
        return $this->CEP;
    }

    /**
     * @param string $address
     */
    public function setAddress(string $address): void
    {
        $this->address = $address;
    }

    /** 
     * @return string address
     */
    public function getAddress(): string
    {
        return $this->address;
    }

    /**
     * @param string $district
     */
    public function setDistrict(string $district): void
    {
        $this->district = $district;
    }

    /** 
     * @return string district
     */
    public function getDistrict(): string
    {
        return $this->district;
    }

    /**
     * @param string $city
     */
    public function setCity(string $city): void
    {
        $this->city = $city;
    }

    /** 
     * @return string city
     */
    public function getCity(): string
    {
        return $this->city;
    }

    /**
     * @param string $federation
     */
    public function setFederation(string $federation): void
    {
        $this->federation = $federation;
    }

    /** 
     * @return string federation
     */
    public function getFederation(): string
    {
        return $this->federation;
    }

    private function toLocationArray(): array{
        return array_filter([
            'CEP' => $this->CEP,
            'address' => $this->address ?? null,
            'district' => $this->district ?? null,
            'city' => $this->city,
            'federation' => $this->federation,
        ], fn($value) => isset($value));
    }

}

?>