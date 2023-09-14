<?php

namespace App\Model\Tool;

trait Location
{
    protected string $CEP;
    protected string $address;
    protected string $neighborhood;
    protected string $city;
    protected string $federation;

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
     * @param string $neighborhood
     */
    public function setNeighborhood(string $neighborhood): void
    {
        $this->neighborhood = $neighborhood;
    }

    /** 
     * @return string neighborhood
     */
    public function getNeighborhood(): string
    {
        return $this->neighborhood;
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

    private function toLocationArray(): array
    {
        return array_filter([
            'CEP' => $this->CEP,
            'address' => $this->address ?? null,
            'neighborhood' => $this->neighborhood ?? null,
            'city' => $this->city,
            'federation' => $this->federation,
        ], fn($value) => isset($value));
    }

}

?>